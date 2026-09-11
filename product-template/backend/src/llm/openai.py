from __future__ import annotations

import os

from openai import AsyncOpenAI


class OpenAIAdapter:
    """Adapter for the OpenAI API (openai SDK)."""

    def __init__(self, model: str) -> None:
        self._model = model
        self._client = AsyncOpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

    async def stream(self, messages: list[dict], system: str):
        """Yield plain-text chunks from the OpenAI model."""
        stream = await self._client.chat.completions.create(
            model=self._model,
            messages=[{"role": "system", "content": system}, *messages],
            max_tokens=1024,
            stream=True,
        )
        async for chunk in stream:
            delta = chunk.choices[0].delta.content
            if delta:
                yield delta

    async def complete(self, prompt: str, system: str = "") -> str:
        """Return a single complete response from the OpenAI model."""
        messages = []
        if system:
            messages.append({"role": "system", "content": system})
        messages.append({"role": "user", "content": prompt})
        response = await self._client.chat.completions.create(
            model=self._model,
            messages=messages,
            max_tokens=512,
        )
        return response.choices[0].message.content or ""
