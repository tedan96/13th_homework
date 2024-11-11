import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { validation } from "../_commons/libraries/validation-file";
import {
  FetchBoard,
  FetchBoards,
  register,
  UPDATE_BOARD,
  UPLOAD_FILE,
} from "../queires/queries";
import { IBoardWriteProps } from "./types";
import { Modal } from "antd";
import { Address } from "react-daum-postcode";

export const UseBoardWrite = (props: IBoardWriteProps) => {
  const router = useRouter();
  const params = useParams(); //라우터 사용 시 파라미터 정보를 가져오기 위한 설정

  const { data } = useQuery(FetchBoard, {
    variables: {
      myboardId: params.boardId,
    },
  });

  const [inputs, setInputs] = useState({
    name_id: "",
    title_id: props.isEdit ? data?.fetchBoard.title_id : "",
    password_id: "",
    contents_id: props.isEdit ? data?.fetchBoard.contents_id : "",
  });

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.id);

    setInputs((prev) => ({
      ...prev,
      [event?.target.id]: event?.target.value,
    }));
  };

  const [nameblank, setNameBlank] = useState("");

  const [passwordblank, setPasswordBlank] = useState("");

  const [titleblank, setTitleBlank] = useState("");

  const [contentblank, setContentBlank] = useState("");

  // const [isActive, setIsActive] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [addressnum, setAddressNum] = useState(
    props.isEdit ? data?.fetchBoard.boardAddress.zipcode : ""
  );

  // useEffect(() => {
  //   setAddressNum(data?.fetchBoard.boardAddress.zipcode);
  // }, [data]);

  const [address, setAddress] = useState(
    props.isEdit ? data?.fetchBoard.boardAddress.address : ""
  );

  const [addressDetail, setAddressDetail] = useState(
    props.isEdit ? data?.fetchBoard.boardAddress.addressDetail : ""
  );
  const onChangeAddressDetail = (event: ChangeEvent<HTMLInputElement>) => {
    setAddressDetail(event.target.value);
  };
  const [youtubeUrl, setYoutubeUrl] = useState(
    props.isEdit ? data?.fetchBoard.youtubeUrl : ""
  );
  const onChangeYoutubeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(event.target.value);
  };

  const [myfunction] = useMutation(register);
  const [updateBoard] = useMutation(UPDATE_BOARD);

  const isButtonDisabled =
    !inputs.name_id ||
    !inputs.password_id ||
    !inputs.title_id ||
    !inputs.contents_id;

  const checkValid = () => {
    if (inputs.name_id === "") {
      setNameBlank("필수입력 사항입니다.");
    } else {
      setNameBlank("");
    }
    if (inputs.password_id === "") {
      setPasswordBlank("필수입력 사항입니다.");
    } else {
      setPasswordBlank("");
    }
    if (inputs.title_id === "") {
      setTitleBlank("필수입력 사항입니다.");
    } else {
      setTitleBlank("");
    }
    if (inputs.contents_id === "") {
      setContentBlank("필수입력 사항입니다.");
    } else {
      setContentBlank("");
    }
  };

  // 등록하기
  const onClickSignup = async () => {
    await checkValid();

    try {
      if (
        inputs.name_id !== "" &&
        inputs.title_id !== "" &&
        inputs.contents_id !== "" &&
        inputs.password_id !== ""
      ) {
        const result = await myfunction({
          variables: {
            createBoardInput: {
              writer: inputs.name_id,
              password: inputs.password_id,
              title: inputs.title_id,
              contents: inputs.contents_id,
              youtubeUrl: youtubeUrl,
              images: imgUrl,
              boardAddress: {
                address: address,
                zipcode: addressnum,
                addressDetail: addressDetail,
              },
            },
          },
          refetchQueries: [{ query: FetchBoards }],
        });
        Modal.success({
          title: "성공!",
        });
        console.log(result.data.createBoard._id);
        router.push("../../../boards");
      }
    } catch (error) {
      console.log(inputs);
      console.log(error);
      Modal.error({
        title: "에러",
      });
    }
  };

  // 수정하기
  const onClickUpdate = async () => {
    const password = prompt("글을 입력할때 입력하셨던 비밀번호를 입력해주세요");
    try {
      const result = await updateBoard({
        variables: {
          boardId: params.boardId,
          password: password,
          updateBoardInput: {
            title: inputs.title_id,
            contents: inputs.contents_id,
            youtubeUrl,
            images: imgUrl,
            boardAddress: {
              address,
              addressDetail,
              zipcode: addressnum,
            },
          },
        },
      });
      console.log(result);
      Modal.success({
        title: "성공",
      });
      router.push(`../../boards/${result.data.updateBoard._id}`);
    } catch {
      Modal.error({
        title: "에러",
      });
    }
  };

  // 수정상태일때 취소버튼 클릭 시 상세정보로 이동, 아니면 목록으로 이동
  const onClickGoToList = () => {
    router.push("../../boards");
  };

  const onClickGoToDetail = () => {
    router.push(`../../boards/${data.fetchBoard._id}`);
  };

  // 우편 검색
  const onToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const handleCpmplete = (data: Address) => {
    const { address, zonecode } = data;
    setAddressNum(zonecode);
    setAddress(address);
    onToggleModal();
  };

  // 사진 등록
  const [uploadfile] = useMutation(UPLOAD_FILE);
  const [imgUrl, setImgUrl] = useState([" ", " ", " "]);
  const fileRef = useRef<HTMLInputElement>(null);

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    const isValid = validation(file);
    if (!isValid) return;

    const result = await uploadfile({
      variables: {
        file,
      },
    });
    setImgUrl(result.data?.uploadFile.url ?? "");
    console.log(result.data?.uploadFile.url);
  };
  const onClickImage = () => {
    fileRef.current?.click();
  };

  const onClickDelete = () => {
    setImgUrl(["", "", ""]);
  };
  return {
    onChangeInput,
    onClickUpdate,
    onClickGoToList,
    onClickGoToDetail,
    onClickSignup,
    handleCpmplete,
    onToggleModal,
    onChangeAddressDetail,
    onChangeYoutubeUrl,
    onClickImage,
    onChangeFile,
    onClickDelete,
    nameblank,
    passwordblank,
    titleblank,
    contentblank,
    address,
    addressDetail,
    addressnum,
    isButtonDisabled,
    isModalOpen,
    data,
    youtubeUrl,
    inputs,
    imgUrl,
    fileRef,
  };
};
