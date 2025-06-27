import { useQuery } from "@tanstack/react-query";
import { api } from "..";

export const useProduct = () => {
  const getProduct = ({ limit = 8, skip = 0 } = {}) => {
    return useQuery({
      queryKey: ["products", limit, skip],
      queryFn: async () => {
        const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
        if (!res.ok) throw new Error("Ошибка загрузки продуктов");
        return res.json();
      },
    });
  };
  const getSearchProduct = (params) => {
    return useQuery({
      queryKey: ["search", params],
      queryFn: async () => {
        const res = await api.get("/products/search", { params });
        return res.data;
      },
      enabled: !!params?.q,
    });
  };
  

  const getProductById = (id) => {
    return useQuery({
      queryKey: ["product", id],
      queryFn: async () => {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("Продукт не найден");
        return res.json();
      },
      enabled: !!id,
    });
  };

  return { getProduct, getProductById, getSearchProduct };
};
  