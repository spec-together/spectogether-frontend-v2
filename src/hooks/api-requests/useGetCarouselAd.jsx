import { useQuery } from "@tanstack/react-query";
import stApi from "../../../api/axiosInterceptor.js";
import { CAROUSEL_AD } from "../../../api/config.js";

export const useGetCarouselAd = () => {
  const options = () => {
    return {
      queryKey: ["carouselAd"],
      queryFn: async () => {
        const response = await stApi.get(CAROUSEL_AD);
        console.log(response.data.success);
        return response.data.success;
      },
      keepPreviousData: true,
    };
  };

  return useQuery(options());
};
