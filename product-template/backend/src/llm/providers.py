"""
Provider registry — factory functions for each supported AI provider.

This abstraction is pre-provisioned infrastructure, not a feature. It exists
so that when a backend spec calls for AI-assisted or AI-native behavior, the
provider plumbing is already there — nothing here is wired into a live
feature until a spec says so.

Usage (provider and model always explicit at the call site):

    from llm import providers

    provider = providers.gemini("gemini-2.5-flash")
    async for chunk in provider.stream(messages, system):
        ...

    result = await providers.anthropic("claude-sonnet-5").complete(prompt)

To add a new provider: create llm/{provider}.py with a class implementing
llm.base.LLMProvider, then add a factory function below.
"""

from __future__ import annotations

from llm.anthropic import AnthropicAdapter
from llm.gemini import GeminiAdapter
from llm.openai import OpenAIAdapter


def gemini(model: str) -> GeminiAdapter:
    """Return a Gemini adapter for the given model. Requires GEMINI_API_KEY."""
    return GeminiAdapter(model)


def anthropic(model: str) -> AnthropicAdapter:
    """Return a Claude adapter for the given model. Requires ANTHROPIC_API_KEY."""
    return AnthropicAdapter(model)


def openai(model: str) -> OpenAIAdapter:
    """Return an OpenAI adapter for the given model. Requires OPENAI_API_KEY."""
    return OpenAIAdapter(model)
