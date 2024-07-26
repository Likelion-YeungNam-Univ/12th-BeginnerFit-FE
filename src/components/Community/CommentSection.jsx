// import styled from "styled-components";
// import { useState, useEffect } from "react";
// import useCommentStore from "../../store/commentStore";
// import { getCommentApi } from "../../apis/communityApi/getCommentApi";
// import DropDown from "./DropDown";

// const CommentSection = ({ post }) => {
//   const { comments, setComments, clearComments, setCommentCount } =
//     useCommentStore((state) => ({
//       comments: state.comments[post.id] || [],
//       setComments: state.setComments,
//       clearComments: state.clearComments,
//       setCommentCount: state.setCommentCount,
//     }));
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     clearComments(post.id);
//     setPage(1);
//     setHasMore(true);
//     const fetchComments = async () => {
//       const initialComments = await getCommentApi(
//         post.id,
//         1,
//         setComments,
//         setIsLoading,
//         setHasMore
//       );
//       setComments(post.id, initialComments);
//       setCommentCount(post.id, initialComments.length);
//     };
//     fetchComments();
//   }, [post.id, clearComments, setComments, setCommentCount]);

//   const handleLoadMore = () => {
//     if (isLoading || !hasMore) return;
//     setPage((prevPage) => prevPage + 1);
//     getCommentApi(post.id, page + 1, setComments, setIsLoading, setHasMore);
//   };
//   return (
//     <>
//       <CommentNum>댓글 {comments.length}개</CommentNum>
//       {comments.map((comment, index) => (
//         <CommentItem key={index}>
//           <RowContainer>
//             <UserContainer>
//               <Profile src={comment.profile}></Profile>
//               <NickAndDate>
//                 <NickName>{comment.username}</NickName>
//                 <Date>{comment.createdAt.substring(0, 10)}</Date>
//               </NickAndDate>
//             </UserContainer>
//             <DropDown></DropDown>
//           </RowContainer>
//           <CommentContent>{comment.content}</CommentContent>
//         </CommentItem>
//       ))}
//       {hasMore && (
//         <Button
//           variant="contained"
//           size="medium"
//           style={{
//             backgroundColor: "#7D7AFF",
//           }}
//           onClick={handleLoadMore}
//         >
//           {isLoading ? "불러오는 중..." : "더 보기"}
//         </Button>
//       )}
//     </>
//   );
// };

// const CommentNum = styled.div`
//   margin: 20px 0;
// `;

// const CommentItem = styled.div`
//   margin-bottom: 20px;
// `;

// const RowContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

// const UserContainer = styled.div`
//   display: flex;
// `;

// const Profile = styled.img`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
// `;

// const NickAndDate = styled.div`
//   margin-left: 10px;
// `;

// const NickName = styled.div`
//   font-weight: bold;
// `;

// const Date = styled.div`
//   font-size: 12px;
//   color: #777;
// `;

// const CommentContent = styled.div`
//   margin-top: 10px;
// `;

// const Button = styled.button`
//   background-color: #7d7aff;
//   color: white;
//   border: none;
//   padding: 10px 20px;
//   border-radius: 5px;
//   cursor: pointer;
// `;

// export default CommentSection;
