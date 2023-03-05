import MainScreen from '../../pages/main-screen/main-screen';

type AppScreenProps = {
  addCount: number;
}

export default function App({addCount}: AppScreenProps): JSX.Element {
  return (
    <MainScreen addCount={addCount} />
  );
}
