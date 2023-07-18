import {
  AspectRatio,
  Button,
  Card,
  Container,
  createStyles,
  Header,
  Image,
  Paper,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
// import { useNavigate, useParams } from 'react-router-dom';
// import SamparkLogo from '../../assets/Images/samparklogotransparent.png';
import { data } from './blogContent';
import './blogs.css';

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  blog: {
    textAlign: 'left',
    width: '50%',
  },
  back: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    border: '1px solid #a3a3a2',
    borderRadius: '10px',
    margin: ' 20px 0',
  },
}));

const Blogs = () => {
  // const { id }: any = useParams();
  const { classes } = useStyles();
  // const navigate = useNavigate();
  // const blogData = data[id];

  return (
    <>
      <Header height={100} mb={50}>
        <Container className={classes.header}>
          {/* <Image src={SamparkLogo} height={80} width={100} /> */}
        </Container>
      </Header>

      <Card className={classes.blog} mx="auto">
        <Button
          my={20}
          className={classes.back}
          // onClick={() => {
          //   navigate('/');
          // }}
        >
          {' '}
          <IconArrowLeft /> Go Back
        </Button>
        <Paper shadow={'md'} my={20}>
          <AspectRatio
            ratio={16 / 9}
            // maw={300}
            mx="auto"
          >
            {/* <Image src={blogData.image} /> */}
          </AspectRatio>
        </Paper>
        {/* <div dangerouslySetInnerHTML={{ __html: blogData.blogData }}></div> */}
      </Card>
    </>
  );
};

export default Blogs;
