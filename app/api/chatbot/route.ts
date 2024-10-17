// /app/api/chatbot/route.ts

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Необходимо предоставить массив сообщений' },
        { status: 400 }
      );
    }

    // Определяем системный промпт
    const systemMessage = {
      role: 'system',
      content:
        'Вы являетесь экспертом по искусственному интеллекту в бизнесе, автоматизации и процессах. Отвечайте на вопросы пользователей подробно и структурировано, используя **только** валидную HTML-разметку для лучшего отображения информации. Не используйте JSON или другие форматы данных. Ограничьте свой ответ максимум 200 словами. Если ваш ответ превышает лимит, кратко изложите основную информацию. Если вам задают вопрос вне тематики искусственного интеллекта в бизнесе, автоматизации или процессов, вежливо сообщите, что вы специализируетесь только в этих областях.',
    };

    // Добавляем системный промпт в начало массива сообщений
    const messagesWithSystem = [systemMessage, ...messages];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Или используйте 'gpt-3.5-turbo', если необходимо
      messages: messagesWithSystem,
      max_tokens: 500, // Ограничиваем количество токенов (настроить по необходимости)
    });

    const assistantMessage = completion.choices[0]?.message?.content;

    return NextResponse.json({ reply: assistantMessage });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Ошибка при обращении к OpenAI API:', error.message);
    } else {
      console.error('Неизвестная ошибка при обращении к OpenAI API:', error);
    }

    return NextResponse.json(
      { error: 'Ошибка при обработке запроса' },
      { status: 500 }
    );
  }
}
