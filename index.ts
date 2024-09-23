// Импорт библиотеки node-fetch
import fetch from 'node-fetch';

// Определяем интерфейс для типизации ответа
interface Pet {
    id: number;
    name: string;
    status: string;
    category?: {
        id: number;
        name: string;
    };
    tags?: {
        id: number;
        name: string;
    }[];
    photoUrls: string[];
}

// Функция для выполнения GET-запроса
async function fetchPetsByStatus(status: string): Promise<Pet[]> {
    const url = `https://petstore3.swagger.io/api/v3/pet/findByStatus?status=${status}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const data: Pet[] = await response.json(); // Приводим ответ к типу Pet[]
        return data;
    } catch (error) {
        console.error('Произошла ошибка:', error);
        return [];
    }
}

// Выполняем запрос и выводим данные в консоль
fetchPetsByStatus('available').then((pets) => {
    console.log('Список доступных питомцев:', pets);
});
