import { Metadata } from 'next';

import Banner from '@/components/home/Banner';
import PlaceSection from '@/components/home/PlaceSection';
import PopularDrinkSection from '@/components/home/PopularDrinkSection';
import ThematicRecommender from '@/components/home/ThematicRecommender';
import Logo from '@/components/layout/Logo';
import Welcome from '@/components/layout/Welcome';
import { getRecommendations } from '@/utils/recommend/recommendationService';

import { fetchPopularDrinks } from './actions/drink';
import { fetchPlaces } from './actions/place';

// ISR 설정
export const revalidate = 518400;

export const metadata: Metadata = {
  title: '한잔해',
  description: 'AI 추천 기반 전통주를 만나보세요!',
};

const Home = async () => {
  const [recommendations, popularDrinks, places] = await Promise.all([
    getRecommendations(),
    fetchPopularDrinks(),
    fetchPlaces(),
  ]);

  return (
    <div className="mx-auto max-w-none xl:max-w-[1280px] xl:pb-[92px]">
      <div className="xl:hidden">
        <Logo />
        <Welcome />
      </div>
      <Banner />
      <ThematicRecommender recommendations={recommendations} />
      <PopularDrinkSection drinks={popularDrinks} />
      <PlaceSection places={places} />
    </div>
  );
};

export default Home;
