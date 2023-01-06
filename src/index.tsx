import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./routes/error-page";
import Index from "./routes";
import { loader as indexLoader } from "./routes";
import MovieRoute from "./routes/movie";
import { loader as movieLoader } from "./routes/movie";
import ShowRoute from "./routes/tv";
import { loader as showLoader } from "./routes/tv";
import PersonRoute from "./routes/person";
import { loader as personLoader } from "./routes/person";
import GenreRoute from "./routes/genre";
import { loader as genreLoader } from "./routes/genre";
import SearchRoute from "./routes/search";
import { loader as searchLoader } from "./routes/search";
import Discover from "./routes/discover";
import { loader as discoverLoader } from "./routes/discover";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: indexLoader(queryClient),
      },
      {
        path: "movie/:movieId",
        element: <MovieRoute />,
        loader: movieLoader(queryClient),
      },
      {
        path: "tv/:showId",
        element: <ShowRoute />,
        loader: showLoader(queryClient),
      },
      {
        path: "person/:personId",
        element: <PersonRoute />,
        loader: personLoader(queryClient),
      },
      {
        path: "genre/:genreId",
        element: <GenreRoute />,
        loader: genreLoader(queryClient),
      },
      {
        path: "discover",
        element: <Discover />,
        loader: discoverLoader(queryClient),
      },
      {
        path: "search/:query",
        element: <SearchRoute />,
        loader: searchLoader(queryClient),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
