import { MessageBody } from './type';

export const getMessage = (body: MessageBody) => {
  const content = `作为一名周易算命大师，请根据我提供的信息帮我计算我未来的运势。我的名字叫${body.name}，我的年龄是${body.age}，我的性别是${body.gender}，我的生日是${body.birthday}，我最近发生的奇怪的事是${body.msg}`;
  return [{ 'role': 'user', 'content': content, 'name': `${body.name}的运势` }];
};
