import { ArticleType, MessageBody } from './type';

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

export const getMessageArticle = (body: ArticleType) => {
  const systemContent = `你是一个作家，你最擅长写的文章是${body.value}${body.type}。`;
  const userContent = `我想写一篇${body.value}${body.type}，请你帮我写一篇${body.value}${body.type}。`;
  const names = body?.name ? `1.文章的主旨是${body.name}；` : '';
  const assistantContent = '要求：' + names + `2.文章分为四个段落；3.用感官描写、注重细节、运用修辞手法、借景抒情、选择合适的写作角度、通过季节和时间变化注重情感表达激发读者想象、注意语言的音韵。4.文章的字数在1200字左右；5.生成对应标题，文章格式严格按照散文格式输出。`;
  return [
    { 'role': 'system', 'content': systemContent },
    { 'role': 'assistant', 'content': userContent + assistantContent }
    // { 'role': 'system', 'content': assistantContent }
  ];
};
