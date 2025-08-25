import {Animals} from "./model/Animals.ts";

export async function loadAnimals(): Promise<Animals[]>{
    const animals: Animals[] = ([]) as Animals[];
    try {
        const response = await fetch('http://localhost:8080/api/animals');
        return await response.json();

    } catch (e) {
        console.error(e);
        return Promise.resolve(animals);
    }
}