export const isTiptapEmpty = (content: any) => {
  if (!content?.content || content.content.length === 0) return true;

  return content.content.every((node: any) => {
    if (node.type === "paragraph") {
      return !node.content || node.content.length === 0;
    }
    return false;
  });
};
