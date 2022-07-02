/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

const timeFmt = new Intl.RelativeTimeFormat("en-US");

// islandコンポーネントにはjson形式でpropsを渡す必要がある
export default function Countdown(props: { target: string }) {
  const target = new Date(props.target);
  const [now, setNow] = useState(new Date());

  // 毎秒毎にnowの日付を現在の日付で更新するインターバルを設定
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
      if (now > target) {
        // clearInterval: setIntervalの取り消し
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [props, target]);

  if (now > target) {
    return <span>🎉</span>;
  }

  const secondsLeft = Math.floor((target.getTime() - now.getTime()) / 1000);
  return <span>{timeFmt.format(secondsLeft, "seconds")}</span>;
}
