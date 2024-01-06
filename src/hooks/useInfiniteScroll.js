import throttle from "just-throttle";
import { useCallback, useEffect, useRef, useState } from "react";
import { useUserSessionStore } from "../store/userSession";

export const useInfiniteScroll = (getFeed, observatedId) => {
    const [feed, setFeed] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const authToken = useUserSessionStore((state) => state.authToken);
    const firstPublicationToFetchRef = useRef(0);
    const [endReached, setEndReached] = useState(false);

    const handleScroll = useCallback(
        throttle(
          async () => {
            const postFeedElement = document.querySelector(`#${observatedId}`);
    
            if (
              window.innerHeight + window.scrollY >=
              postFeedElement.offsetHeight
            ) {
              setIsLoading(true);
              const newFeedResponse = await getFeed(
                authToken,
                firstPublicationToFetchRef.current
              );
              setFeed((prevFeed) => [
                ...prevFeed,
                ...newFeedResponse.feed,
              ]);
              firstPublicationToFetchRef.current = firstPublicationToFetchRef.current + 3;
              setEndReached(newFeedResponse.endReached);
              setIsLoading(false);
            }
          },
          300,
          { leading: true }
        ),
        []
      );
    
      useEffect(() => {
        const setUserPostFeed = async () => {
          const newFeed = await getFeed(
            authToken,
            firstPublicationToFetchRef.current
          );
    
          setFeed(newFeed.feed);
          firstPublicationToFetchRef.current = firstPublicationToFetchRef.current + 3;
        };
    
        if (!feed) setUserPostFeed();
        if (!endReached) window.addEventListener("scroll", handleScroll);
    
        return () => window.removeEventListener("scroll", handleScroll);
      }, [endReached]);

  return { isLoading, feed}
}