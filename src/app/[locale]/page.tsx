import { getCurrentUser } from '@/actions/getCurrentUser';
import Container from '@/components/container';
import TopHome from '@/components/home/top-home';
import { connectToDB } from '@/lib/mongoDB';
import HomwClient from '@/components/home/home-client';
import { getTransferDetails } from '@/actions/getTransferDetails';

// import HomeGradiant from '@/components/home-gradiant';

const Page = async () => {
  await connectToDB();
  const user = await getCurrentUser();
  const transferedList = await getTransferDetails()

  return (
    <div >
      {/* <HomeGradiant /> */}
      <Container>
        {/* <TopHome id={user?._id} email={user?.email} name={user?.name} /> */}
        <TopHome user={user} />
        <HomwClient user={user} transferedList={transferedList} />
      </Container>
    </div>
  );
}

export default Page