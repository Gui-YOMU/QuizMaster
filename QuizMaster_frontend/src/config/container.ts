import * as UseCases from "../core/application/useCases";
import * as Repositories from "../core/infrastructure/adapters";

const userRepository = new Repositories.UserRepo.HttpUserRepository();

const quizRepository = new Repositories.QuizRepo.HttpQuizRepository;

const questionRepository = new Repositories.QuestionRepo.HttpQuestionRepository();

const answerRepository = new Repositories.AnswerRepo.HttpAnswerRepository();

// const itemRepository = new Repositories.ItemRepo.HttpItemRepository();

// const roomRepository = new Repositories.RoomRepo.HttpRoomRepository();

// const teamRepository = new Repositories.TeamRepo.HttpTeamRepository();

// const teamToQuestionRepository = new Repositories.TeamToQuestionRepo.HttpTeamToQuestionRepository();

export const container = {
  user: {
    getAllUsers: new UseCases.UserUC.GetAllUsers(userRepository),
    getUserByMail: new UseCases.UserUC.GetUserByMail(userRepository),
    getUserById: new UseCases.UserUC.GetUserById(userRepository),
    createUser: new UseCases.UserUC.CreateUser(userRepository),
    updateUser: new UseCases.UserUC.UpdateUser(userRepository),
    deleteUser: new UseCases.UserUC.DeleteUser(userRepository),
  },
  quiz: {
    createQuiz: new UseCases.QuizUC.CreateQuiz(quizRepository),
    updateQuiz: new UseCases.QuizUC.UpdateQuiz(quizRepository),
    deleteQuiz: new UseCases.QuizUC.DeleteQuiz(quizRepository),
    getQuizById: new UseCases.QuizUC.GetQuizById(quizRepository),
    getAllQuizByUser: new UseCases.QuizUC.GetAllQuizByUser(quizRepository),
  },
  question: {
    createQuestion: new UseCases.QuestionUC.CreateQuestion(questionRepository),
    updateQuestion: new UseCases.QuestionUC.UpdateQuestion(questionRepository),
    deleteQuestion: new UseCases.QuestionUC.DeleteQuestion(questionRepository),
    getAllQuestionsByQuiz: new UseCases.QuestionUC.GetAllQuestionsByQuiz(questionRepository),
    getQuestionById: new UseCases.QuestionUC.GetQuestionById(questionRepository),
  },
  answer: {
    createAnswers: new UseCases.AnswerUC.CreateAnswers(answerRepository),
    deleteAnswers: new UseCases.AnswerUC.DeleteAnswers(answerRepository),
    getAllAnswersByQuestion: new UseCases.AnswerUC.GetAllAnswersByQuestion(answerRepository),
    getAnswerById: new UseCases.AnswerUC.GetAnswerById(answerRepository)
  },
  // item: {
  //   createItem: new UseCases.ItemUC.CreateItem(itemRepository),
  //   updateItem: new UseCases.ItemUC.UpdateItem(itemRepository),
  //   deleteItem: new UseCases.ItemUC.DeleteItem(itemRepository),
  // },
  // room: {
  //   createRoom: new UseCases.RoomUC.CreateRoom(roomRepository),
  //   updateRoom: new UseCases.RoomUC.UpdateRoom(roomRepository),
  //   deleteRoom: new UseCases.RoomUC.DeleteRoom(roomRepository),
  // },
  // team: {
  //   createTeam: new UseCases.TeamUC.CreateTeam(teamRepository),
  //   updateTeam: new UseCases.TeamUC.UpdateTeam(teamRepository),
  //   deleteTeam: new UseCases.TeamUC.DeleteTeam(teamRepository),
  // },
  // teamToQuestion: {
  //   createTeamToQuestion: new UseCases.TeamToQuestionUC.CreateTeamToQuestion(teamToQuestionRepository),
  //   updateTeamToQuestion: new UseCases.TeamToQuestionUC.UpdateTeamToQuestion(teamToQuestionRepository),
  //   deleteTeamToQuestion: new UseCases.TeamToQuestionUC.DeleteTeamToQuestion(teamToQuestionRepository),
  // },
} as const;
