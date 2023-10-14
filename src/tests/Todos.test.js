import React from "react";
import { render, waitForElement, screen } from "@testing-library/react";
import TutorialsList from "../components/TutorialsList";
import axios from "axios";

jest.mock("axios");
 const dummyTodos=[{"id":1,
  "name":"test",
  "description":"testd",
  "startDate":"22-09-2023",
  "endDate":"29-09-2023",
  "status":"completed",
  "effortRequired":50
  },
  {"id":1,
      "name":"test",
      "description":"testd",
      "startDate":"22-09-2023",
      "endDate":"29-09-2023",
      "status":"completed",
      "effortRequired":10
   },
   {
      "id":1,
          "name":"test",
          "description":"testd",
          "startDate":"22-09-2023",
          "endDate":"29-09-2023",
          "status":"completed",
          "effortRequired":30
   },
   {"id":1,
              "name":"test",
              "description":"testd",
              "startDate":"22-09-2023",
              "endDate":"29-09-2023",
              "status":"completed",
              "effortRequired":2
   }]

test("todos list", async () => {
axios.get.mockResolvedValue({ data: dummyTodos });
render(<TutorialsList />);

const todoList = await waitForElement(() => screen.findAllByTestId("todo"));

expect(todoList).toHaveLength(4);
});