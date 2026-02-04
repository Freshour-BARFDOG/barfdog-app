import { colors } from "@/constants/colors";
import { Tabs } from "expo-router";
import React from "react";

// SVG 아이콘 import
import AiActiveIcon from "@/assets/icons/tab/ai-active.svg";
import AiIcon from "@/assets/icons/tab/ai.svg";
import HomeActiveIcon from "@/assets/icons/tab/home-active.svg";
import HomeIcon from "@/assets/icons/tab/home.svg";
import MypageActiveIcon from "@/assets/icons/tab/mypage-active.svg";
import MypageIcon from "@/assets/icons/tab/mypage.svg";
import NoteActiveIcon from "@/assets/icons/tab/note-active.svg";
import NoteIcon from "@/assets/icons/tab/note.svg";
import StoreActiveIcon from "@/assets/icons/tab/store-active.svg";
import StoreIcon from "@/assets/icons/tab/store.svg";
import BottomTabBar from "@/components/layout/bottomTabBar/BottomTabBar";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: colors.red.main,
        tabBarInactiveTintColor: colors.gray[400],
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "홈",
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? HomeActiveIcon : HomeIcon;
            return <Icon width={24} height={24} />;
          },
        }}
      />

      <Tabs.Screen
        name="store"
        options={{
          tabBarLabel: "스토어",
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? StoreActiveIcon : StoreIcon;
            return <Icon width={24} height={24} />;
          },
        }}
      />

      <Tabs.Screen
        name="diet-analysis"
        options={{
          tabBarLabel: "AI추천식단",
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? AiActiveIcon : AiIcon;
            return <Icon width={24} height={24} />;
          },
        }}
      />

      <Tabs.Screen
        name="health-note"
        options={{
          tabBarLabel: "건강수첩",
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? NoteActiveIcon : NoteIcon;
            return <Icon width={24} height={24} />;
          },
        }}
      />

      <Tabs.Screen
        name="mypage"
        options={{
          tabBarLabel: "마이페이지",
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? MypageActiveIcon : MypageIcon;
            return <Icon width={24} height={24} />;
          },
        }}
      />
    </Tabs>
  );
}
