import { API } from "../../backend";

export const getProducts = async () => {
    try {
        const response = await fetch(`${API}/product/products`, { method: 'GET' });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error; // Re-throw the error to let the calling code handle it
    }
};
