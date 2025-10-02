import styles from './styles.module.scss';

export function Page1() {
  // const { postId } = useParams();
  // const dispatch = useAppDispatch();
  // const post = useAppSelector((state) => state.posts.item);

  // useEffect(() => {
  //   req(postId!);
  // }, [postId]);

  // const req = async (postId: string) => {
  //   const res = await dispatch(requestPost(postId)).unwrap();
  //   if (res) {
  //     console.log(
  //       'additional logic after post request using its info. Must use the unwrap() method to access response fields'
  //     );
  //   }
  // };

  // if (!post) return <p>Loading...</p>;

  return (
    <div>
      <p className={styles.something}>Page 1</p>
      {/* <p>Post id: {post.id}</p> */}
    </div>
  );
}
