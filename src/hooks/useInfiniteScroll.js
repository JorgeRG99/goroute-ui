import throttle from "just-throttle";
import { useCallback, useEffect, useRef, useState } from "react";
import { useUserSessionStore } from "../store/userSession";

export const useInfiniteScroll = (getFeed, elementToObserve) => {
  const [feed, setFeed] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const authToken = useUserSessionStore((state) => state.authToken);
  const firstPublicationToFetchRef = useRef(0);
  const [isIntersecting, setIsIntersecting] = useState(false)

  const displayMoreFeed = useCallback(
    throttle(
      async () => {
        setIsLoading(true);
        const newFeedResponse = await getFeed(
          authToken,
          firstPublicationToFetchRef.current
        );
        setFeed((prevFeed) => [
          ...prevFeed,
          ...newFeedResponse,
        ]);
        firstPublicationToFetchRef.current = firstPublicationToFetchRef.current + 3;
        setIsLoading(false);

      },
      100,
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

      setFeed(newFeed);
      firstPublicationToFetchRef.current = firstPublicationToFetchRef.current + 3;
    };

    const observer = new IntersectionObserver(
      (entry) => {
        setIsIntersecting(entry[0].isIntersecting);
      },
      { threshold: 0.9 }
    );

    if(elementToObserve.current) observer.observe(elementToObserve.current);

    if (!feed) setUserPostFeed();

    return () => observer.disconnect();
  }, [firstPublicationToFetchRef.current, isIntersecting]);

  useEffect(() => {
    if (isIntersecting) displayMoreFeed()
  }, [isIntersecting])

  return { isLoading, feed }
}