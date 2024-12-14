import { s } from "./Clock.style";
import { Text } from "react-native";
import { Txt } from "../Txt/Txt";
import { nowTOHHMM } from "../../utils/date-time";
import { useEffect, useState } from "react";

export function Clock() {
  const [time, setTime] = useState(nowTOHHMM());
  useEffect(() => {
    setInterval(() => {
      setTime(nowTOHHMM());
    }, 1000);
  }, []);
  return <Txt style={s.time}>{time}</Txt>;
}
