import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./routes/error-page";
import Index from "./routes";
import { loader as indexLoader } from "./routes";
import Movie from "./routes/movie";
import { loader as movieLoader } from "./routes/movie";
import Person from "./routes/person";
import { loader as personLoader } from "./routes/person";
import Genre from "./routes/genre";
import { loader as genreLoader } from "./routes/genre";
import Keyword from "./routes/keyword";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Discover from "./routes/discover";

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
        element: <Movie />,
        loader: movieLoader(queryClient),
      },
      {
        path: "person/:personId",
        element: <Person />,
        loader: personLoader(queryClient),
      },
      {
        path: "genre/:genreId",
        element: <Genre />,
        loader: genreLoader(queryClient),
      },
      {
        path: "keyword/:keywordId",
        element: <Keyword />,
      },
      {
        path: "discover",
        element: <Discover />,
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
