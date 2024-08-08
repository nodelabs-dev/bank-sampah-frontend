import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import UsersCard from '../../components/UsersCard';
import SkeletonImage from '../../components/SkeletonImage';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Users() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const getUsersHandler = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.API_URL}/admin/users-all`,
      );
      setUsers(response?.data?.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const deleteUserHandler = async (id: number) => {
    setIsDeleteLoading(true);
    try {
      await axios.delete(`${process.env.API_URL}/admin/delete-user/${id}`);
      setUsers((prevUsers: any) =>
        prevUsers.filter((user: any) => user.id !== id),
      );
      setIsDeleteLoading(false);
    } catch (error) {
      console.error('Failed to delete user:', error);
      setIsDeleteLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUsersHandler();
    }, []),
  );

  const filteredUsers = users
    ?.filter((user: any) =>
      user?.nama_lengkap.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort(
      (a: any, b: any) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );

  return (
    <SafeAreaView className="flex flex-1">
      {isLoading ? (
        <View className="flex flex-1 justify-center items-center">
          <ActivityIndicator size={'large'} color={'#000'} />
        </View>
      ) : (
        <View className="px-1.5 w-full">
          <View>
            <Text className="font-jakarta text-sm text-slate-700 mb-2 mt-2">
              Cari Pengguna
            </Text>
            <TextInput
              className="border font-jakarta border-emerald-700 rounded-full p-3 mb-2 w-full"
              placeholder="Cari pengguna berdasarkan nama lengkap..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {filteredUsers && filteredUsers.length > 0 ? (
              filteredUsers.map((user: any) => (
                <UsersCard
                  key={user?.id}
                  fullname={user?.nama_lengkap}
                  email={user?.email}
                  point={user?.poin}
                  createdAt={user?.created_at}>
                  <SkeletonImage
                    uri={user?.url_profil}
                    style={{width: 112, height: 112, borderRadius: 8}}
                  />
                  <View className="absolute right-3 top-3 z-50">
                    <TouchableOpacity
                      onPress={() => deleteUserHandler(user?.id)}>
                      {isDeleteLoading ? (
                        <ActivityIndicator size={'small'} color={'#fff'} />
                      ) : (
                        <Icon name="trash" size={24} color="red" />
                      )}
                    </TouchableOpacity>
                  </View>
                </UsersCard>
              ))
            ) : (
              <Text className="text-center font-jakarta text-lg font-semibold text-red-500 mt-4">
                Pengguna tidak ditemukan
              </Text>
            )}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}
