from __future__ import annotations

import os

import anthropic


class AnthropicAdapter:
    """Adapter for the Anthropic API (anthropic SDK)."""

    def __init__(self, model: str) -> None:
        self._model = model
        self._client = anthropic.AsyncAnthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

    async def stream(self, messages: list[dict], system: str):
        """Yield plain-text chunks from the Claude model."""
        async with self._client.messages.stream(
            model=self._model,
            system=system,
            max_tokens=1024,
            messages=[{"role": m["role"], "content": m["content"]} for m in messages],
        ) as stream:
            async for text in stream.text_stream:
                yield text

    async def complete(self, prompt: str, system: str = "") -> str:
        """Return a single complete response from the Claude model."""
        response = await self._client.messages.create(
            model=self._model,
            system=system,
            max_tokens=512,
            messages=[{"role": "user", "content": prompt}],
        )
        return "".join(block.text for block in response.content if block.type == "text")
