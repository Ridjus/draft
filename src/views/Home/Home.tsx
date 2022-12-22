import { Main } from '~/components/Layout/Main/Main';
import { Sidebar } from '~/components/Layout/Sidebar/Sidebar';

export function Home() {
  return (
    <div className="bg-page full-screen content-center home">
      <Sidebar>Sidebar</Sidebar>
      <Main>Main</Main>
    </div>
  );
}
