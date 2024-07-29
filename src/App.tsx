/** App.tsx */
import React, { Suspense } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const KanbanBoardPages = React.lazy(() => import("./Pages/KanbanBoardPages"));
const DashboardPage = React.lazy(() => import("./Pages/DashboardPage"));

import FormPages from "./Pages/FormPages";
import Home from "./Pages/Home";
import Header from "./components/Header";



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
              <Route path="/card" element={<Suspense fallback={<div>loding...</div>}><KanbanBoardPages /></Suspense>} />
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
              <Route path="/Dashboard" element={<Suspense fallback={<div>loding...</div>}><DashboardPage /></Suspense>} /><Route
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
