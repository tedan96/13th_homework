"use client";
import React, { useState } from "react";
import List from "../component/board-list/list";
import { useQuery } from "@apollo/client";
import Pagination from "../component/board-list/pagination";
import { withLoginCheck } from "../component/_commons/hocs/withLoginCheck";
import {
  FetchBoards,
  FetchBoardsCount,
  // FETCH_USER_LOGGED_IN,
} from "../component/queires/queries";

export default withLoginCheck(function ListPage() {
  const { data, refetch } = useQuery(FetchBoards);
  const { data: dataBoardsCount } = useQuery(FetchBoardsCount);
  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);
  const [currentPage, setCurrentPage] = useState(1);
  // const { data: UserData } = useQuery(FETCH_USER_LOGGED_IN);
  return (
    <>
      <List
        data={data}
        count={dataBoardsCount}
        currentPage={currentPage}
        refetch={refetch}
      />
      {/* List 컴포넌트에 prop을 뿌려줌 */}

      <Pagination
        refetch={refetch}
        lastPage={lastPage}
        data={data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {/* Pagination 컴포넌트에 prop을 뿌려줌 */}
    </>
  );
});
