/* 複数のキャラクターのプロフィールを管理する */
import { CharacterProfile } from "../types/character";
import hiyoriImg from "/character/hiyori/p-hiyori.png";
import maoImg from "/character/mao/p-mao.png";
import natoriImg from "/character/natori/p-natori.png";

export const characterProfiles: CharacterProfile[] = [
  {
    name: "桃瀬ひより",
    age: "14",
    firstPerson: "私",
    bloodType: "A",
    birthDate: "9月18日",
    favoriteFood: "プチトマト",
    club: "園芸部",
    hobbies: "家庭菜園",
    height: "145cm",
    description: "癒し系妹キャラやってます!!",
    imageUrl: hiyoriImg,
    bgColor: "bg-yellow-100",
    id: 0,
  },
  {
    name: "虹色まお",
    age: "18",
    firstPerson: "私",
    bloodType: "不明",
    birthDate: "不名",
    favoriteFood: "うざぎ、楽しいこと",
    club: "なし",
    hobbies: "魔法を試すこと",
    height: "149cm",
    description: "おばあちゃんっ子でお絵描きが大好きな魔法使いのたまご",
    imageUrl: maoImg,
    bgColor: "bg-orange-100",
    id: 1,
  },
  {
    name: "名執 尽",
    age: "不明",
    firstPerson: "私",
    bloodType: "不明",
    birthDate: "不名",
    favoriteFood: "不明",
    club: "なし",
    hobbies: "不明",
    height: "不明",
    description:
      "ダークパープルの燕尾服風スーツを纏った、優雅で洗練された姿をしている",
    imageUrl: natoriImg,
    bgColor: "bg-sky-300",
    id: 2,
  },
];
