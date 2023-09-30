export default function Topic(props) {
  const { topicName } = props;
  return (
    <div className="topic-name">
      <p>{topicName}</p>
    </div>
  );
}
