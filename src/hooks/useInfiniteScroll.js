import throttle from "just-throttle";
import { useCallback, useEffect, useRef, useState } from "react";
import { useUserSessionStore } from "../store/userSession";

export const useInfiniteScroll = (getFeed, elementToObserve, filters) => {
  const [feed, setFeed] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const firstPublicationToFetchRef = useRef(0);
  const prevFilters = useRef(filters);
  const authToken = useUserSessionStore((state) => state.authToken);
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [endReached, setEndReached] = useState(false)

  const displayMoreFeed = useCallback(
    throttle(
      async () => {
        setIsLoading(true);
        const newFeedResponse = await getFeed(
          authToken,
          firstPublicationToFetchRef.current,
          filters
        );
        setFeed((prevFeed) => [
          ...prevFeed,
          ...newFeedResponse.feed,
        ]);
        setEndReached(newFeedResponse.endReached)
        firstPublicationToFetchRef.current = firstPublicationToFetchRef.current + 3;
        setIsLoading(false);
      },
      300,
      { leading: true }
    ),
    [filters.firstFilter, filters.secondFilter]
  );

  useEffect(() => {
    const setUserPostFeed = async () => {
      const newFeed = await getFeed(
        authToken,
        firstPublicationToFetchRef.current,
        filters
      );

      setFeed(newFeed.feed);
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
    if (filters.firstFilter !== prevFilters.current.firstFilter || filters.secondFilter !== prevFilters.current.secondFilter) {
      firstPublicationToFetchRef.current = 0
      prevFilters.current = filters
      setUserPostFeed()
    }

    return () => observer.disconnect();
  }, [firstPublicationToFetchRef.current, isIntersecting, filters.firstFilter, filters.secondFilter]);

  useEffect(() => {
    if (isIntersecting && !endReached) displayMoreFeed()
  }, [isIntersecting])

  return { isLoading, feed }
}