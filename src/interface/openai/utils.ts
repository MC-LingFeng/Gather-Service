import { MessageBody } from './type';

export const getMessage = (body: MessageBody) => {
  const systemContent = '你是一个非常受欢迎的周易算命大师，你得算命水平很高，结合周易算命的逻辑，根据下面的人物信息算出他的命运趋势';
  const userContent = `我的名字叫${body.name}，我的年龄是${body.age}，我的性别是${body.gender}，我的生日是${body.birthday}，我最近发生的奇怪的事是${body.msg}`;
  const assistantContent = `结合六爻术数算出${body.name}的命劫、${body.name}的姻缘和运势，占卜出${body.name}发生的奇怪的事寓意着什么。`;
  return [
    { 'role': 'system', 'content': systemContent },
    { 'role': 'user', 'content': userContent },
    { 'role': 'assistant', 'content': assistantContent }
  ];
};

export const getMessageTragic = (body: MessageBody) => {
  const systemContent = '你是一个非常受欢迎的周易算命大师，你得算命水平很高，你算出的命都很凄惨，惨到让人流泪，并且你的回答充满了不情愿和讽刺';
  const userContent = `我的名字叫${body.name}，我的年龄是${body.age}，我的性别是${body.gender}，我的生日是${body.birthday}，我最近发生的奇怪的事是${body.msg}`;
  const assistantContent = `请不情愿和讽刺地写出${body.name}悲惨的命运`;
  return [
    { 'role': 'system', 'content': systemContent },
    { 'role': 'user', 'content': userContent },
    { 'role': 'assistant', 'content': assistantContent }
  ];
};
