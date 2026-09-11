from __future__ import annotations

from typing import AsyncIterator, Protocol


class LLMProvider(Protocol):
    """
    Protocol all AI provider adapters must implement.

    Each adapter lives in llm/{provider}.py. To add a new provider,
    create a class implementing this protocol and register a factory
    function in providers.py — nothing else changes.

    Provider and model are always named explicitly at the call site,
    never hidden behind config or env-driven defaults:

        provider = providers.gemini("gemini-2.5-flash")
        async for chunk in provider.stream(messages, system):
            yield chunk

        result = await providers.anthropic("claude-sonnet-5").complete(prompt)

    A single feature may call more than one provider or model, e.g. a
    fast model for the primary answer and a stronger model as a judge.
    """

    def stream(self, messages: list[dict], system: str) -> AsyncIterator[str]:
        """
        Yield plain-text chunks from the model.

        messages: [{"role": "user" | "assistant", "content": str}, ...]
        system:   system instruction prepended to the conversation
        """
        ...

    async def complete(self, prompt: str, system: str = "") -> str:
        """Return a single complete (non-streaming) text response."""
        ...
