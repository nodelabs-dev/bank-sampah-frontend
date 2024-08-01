import {ActivityIndicator, SafeAreaView, ScrollView, Text} from 'react-native';
import {useEffect, useState} from 'react';
import axios from 'axios';
import SkeletonImage from '../../components/SkeletonImage';
import RewardCard from '../../components/RewardCard';

export default function Point({navigation}: any) {
  const [rewards, setRewards] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getRewardsHandler = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.API_URL}/hadiah`);
        console.log(response?.data);
        setRewards(response?.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    getRewardsHandler();
  }, []);

  return (
    <SafeAreaView className="flex flex-1 justify-center">
      {isLoading ? (
        <ActivityIndicator size={'large'} color={'black'} />
      ) : (
        <ScrollView
          className="px-1.5 mb-2"
          showsVerticalScrollIndicator={false}>
          {rewards ? (
            rewards?.map((reward: any) => (
              <RewardCard
                key={reward?.id}
                navigate={() => navigation.navigate('PointDetail', {reward})}
                title={reward?.nama_hadiah}
                description={reward?.description}
                stock={reward?.stock}
                neededPoint={reward?.poin_diperlukan}>
                <SkeletonImage
                  uri={reward?.url_img}
                  style={{
                    backgroundColor: '#fff',
                    width: 112,
                    height: 112,
                    borderRadius: 8,
                  }}
                />
              </RewardCard>
            ))
          ) : (
            <Text>Hadiah Kosong</Text>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
