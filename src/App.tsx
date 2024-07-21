/** App.tsx */
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import "./App.css";
import FormPages from "./Pages/FormPages";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./components/Header";
import { Id } from "./components/Kanban/types";
const KanbanBoardPages = React.lazy(() => import("./Pages/KanbanBoardPages"));

const DashboardPage = React.lazy(() => import("./Pages/DashboardPage"));

export default function App() {
  const methods = useForm();

  return (
    <div className="App ">
      <Router>
        <div className="flex h-screen flex-col">
          <Header />
          <div className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/card" element={<KanbanBoardPages />} />
              <Route
                path="/FormPages"
                element={
                  <FormProvider {...methods}>
                    <FormPages
                      task={{
                        id: "",
                        columnId: "",
                        content: "",
                        time: 0,
                      }}
                      deleteTask={function (): void {
                        throw new Error("Function not implemented.");
                      }}
                      updateTask={function (): void {
                        throw new Error("Function not implemented.");
                      }}
                    ></FormPages>
                  </FormProvider>
                }
              />
              <Route path="/Dashboard" element={<DashboardPage />} />
              <Route
                path="*"
                element={
                  <div>
                    Not found
                    <Link to={"/"}>
                      <b className="text-sky-400">Go to Home</b>
                    </Link>
                  </div>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}
