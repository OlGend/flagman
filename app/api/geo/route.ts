// api/edge-geo.ts
import { geolocation } from '@vercel/edge';
 
export const config = {
  runtime: 'edge',  // Указывает, что эта функция должна выполняться на краю
};
 
export default function handler(request: Request) {
  const { city } = geolocation(request);  // Получает город входящего запроса
  // Вы также можете использовать geolocation(request).city, чтобы получить город

  // Отправляет ответ
  return new Response(`<h1>Ваше местоположение — ${city}</h1>`, {
    headers: { 'content-type': 'text/html' },
  });
}
