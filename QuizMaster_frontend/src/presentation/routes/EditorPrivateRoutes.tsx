import { EditorLayout } from "../components/templates/EditorLayout/EditorLayout";
import { MainLayout } from "../components/templates/MainLayout/MainLayout";
import { QuestionParamsPage } from "../pages/editor/QuestionParamsPage/QuestionParamsPage";
import { QuestionTypePage } from "../pages/editor/QuestionTypePage/QuestionTypePage";
import { QuestionViewPage } from "../pages/editor/QuestionViewPage/QuestionViewPage";
import { QuizMainPage } from "../pages/editor/QuizMainPage/QuizMainPage";
import { CreatorDashboardPage } from "../pages/main/CreatorDashboardPage/CreatorDashboardPage";
import { CreatorStatsPage } from "../pages/main/CreatorStatsPage/CreatorStatsPage";
import { QuizListPage } from "../pages/main/QuizListPage/QuizListPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { CreatorRoute } from "./CreatorRoute";

export const EditorPrivateRoutes = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <CreatorRoute />,
        children: [
          {
            element: <MainLayout />,
            children: [
              {
                path: "/creatorDashboard",
                element: <CreatorDashboardPage />,
              },
              {
                path: "/allQuiz",
                element: <QuizListPage />,
              },
              {
                path: "/creatorStats",
                element: <CreatorStatsPage />,
              },
            ],
          },
          {
            element: <EditorLayout />,
            children: [
              {
                path: "/quizMain/:quizId",
                element: <QuizMainPage />,
              },
              {
                path: "/questionView/:questionId",
                element: <QuestionViewPage />,
              },
              {
                path: "/questionType/:questionId",
                element: <QuestionTypePage />,
              },
              {
                path: "/questionParams/:questionId",
                element: <QuestionParamsPage />,
              },
            ],
          },
        ],
      },
    ],
  },
];
