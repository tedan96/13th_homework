import { gql } from "@apollo/client";

// 게시글 등록
export const register = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      createdAt
      updatedAt
      youtubeUrl
      images
      boardAddress {
        zipcode
        address
        addressDetail
      }
    }
  }
`;

// 게시글 수정
export const UPDATE_BOARD = gql`
  mutation updateBoard(
    $boardId: ID!
    $password: String
    $updateBoardInput: UpdateBoardInput!
  ) {
    updateBoard(
      boardId: $boardId
      password: $password
      updateBoardInput: $updateBoardInput
    ) {
      _id
      title
      contents
      createdAt
      updatedAt
      writer
      youtubeUrl
      images
      boardAddress {
        address
        addressDetail
        zipcode
      }
    }
  }
`;

// 게시글 조회
export const FetchBoard = gql`
  query fetchBoard($myboardId: ID!) {
    fetchBoard(boardId: $myboardId) {
      _id
      writer
      title
      contents
      createdAt
      youtubeUrl
      images
      boardAddress {
        address
        zipcode
        addressDetail
      }
    }
  }
`;

// 댓글 작성
export const Comment = gql`
  mutation createBoardComment(
    $createBoardCommentInput: CreateBoardCommentInput!
    $boardId: ID!
  ) {
    createBoardComment(
      createBoardCommentInput: $createBoardCommentInput
      boardId: $boardId
    ) {
      _id
      contents
      createdAt
      writer
      rating
    }
  }
`;

// 댓글 조회
export const FETCH_COMMENTS = gql`
  query fetchBoardComments($page: Int, $boardId: ID!) {
    fetchBoardComments(page: $page, boardId: $boardId) {
      writer
      contents
      createdAt
      _id
      rating
    }
  }
`;

// 댓글 수정
export const UPDATE_COMMENT = gql`
  mutation updateBoardComment(
    $boardCommentId: ID!
    $updateBoardCommentInput: UpdateBoardCommentInput!
    $password: String!
  ) {
    updateBoardComment(
      boardCommentId: $boardCommentId
      updateBoardCommentInput: $updateBoardCommentInput
      password: $password
    ) {
      _id
      contents
      rating
      writer
      updatedAt
    }
  }
`;

// 게시글 삭제
export const DeleteBoard = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

// 게시글 수 조회
export const FetchBoardsCount = gql`
  query fetchBoardsCount {
    fetchBoardsCount
  }
`;

// 게시글 조회
export const FetchBoards = gql`
  query fetchBoards($mypage: Int, $search: String) {
    fetchBoards(page: $mypage, search: $search) {
      writer
      contents
      title
      createdAt
      _id
      images
    }
  }
`;

// 사진 등록
export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

// 회원가입 ========== ^^
export const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
      name
    }
  }
`;

// 로그인
export const LOGIN = gql`
  mutation loginUser($password: String!, $email: String!) {
    loginUser(password: $password, email: $email) {
      accessToken
    }
  }
`;

export const FETCHUSER = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
    }
  }
`;

// 상품 등록
export const CreateTravelProduct = gql`
  mutation createTravelproduct(
    $createTravelproductInput: CreateTravelproductInput!
  ) {
    createTravelproduct(createTravelproductInput: $createTravelproductInput) {
      _id
      name
      contents
      price
      travelproductAddress {
        zipcode
        address
        addressDetail
      }
    }
  }
`;

// 상품 조회
export const FETCHTRAVELPRODUCT = gql`
  query fetchTravelproduct($travelproductId: ID!) {
    fetchTravelproduct(travelproductId: $travelproductId) {
      _id
      name
      remarks
      contents
      price
      travelproductAddress {
        _id
        zipcode
        addressDetail
      }
    }
  }
`;

// 상품 수정
export const UPDATETRAVELPRODUCT = gql`
  mutation updateTravelproduct(
    $updateTravelproductInput: UpdateTravelproductInput!
    $travelproductId: ID!
  ) {
    updateTravelproduct(
      updateTravelproductInput: $updateTravelproductInput
      travelproductId: $travelproductId
    ) {
      _id
      name
      contents
      remarks
      price
      travelproductAddress {
        _id
        zipcode
        addressDetail
      }
    }
  }
`;

export const FETCHTRAVELPRODUCTS = gql`
  query fetchTravelproducts {
    fetchTravelproducts {
      _id
      name
      contents
      remarks
      travelproductAddress {
        _id
        zipcode
        addressDetail
      }
    }
  }
`;

export const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
    }
  }
`;

// export const LOGOUTUSER = gql`
//   mutation LogoutUser {
//     LogoutUser {

//     }
//   }
// `;
