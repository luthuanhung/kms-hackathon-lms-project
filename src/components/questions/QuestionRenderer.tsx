import ErrorHuntWidget from "./ErrorHuntWidget";
import OrderingWidget from "./OderingWidget";
import MatchingWidget from "./MatchingWidget";
import MultipleChoiceWidget from "./MultipleChoiceWidget";

type Question =
  | { type: "ERROR_HUNT"; lines: string[]; correct_error_line_index: number }
  | { type: "ORDERING"; items: string[] }
  | { type: "MATCHING"; premises: string[]; responses: string[] }
  | { type: "MULTIPLE_CHOICE"; question: string; options: string[]; solution: number };

type Props = {
  question: Question;
  onSubmit: (result: { answer: number; confidence_score: number; time_spent: number }) => void;
};

export default function QuestionRenderer({ question, onSubmit }: Props) {
  switch (question.type) {
    case "ERROR_HUNT":
      return (
        <ErrorHuntWidget
          lines={question.lines}
          correct_error_line_index={question.correct_error_line_index}
          onSubmit={onSubmit}
        />
      );
    case "ORDERING":
      return <OrderingWidget items={question.items} onSubmit={onSubmit} />;
    case "MATCHING":
      return (
        <MatchingWidget
          premises={question.premises}
          responses={question.responses}
          onSubmit={onSubmit}
        />
      );
    case "MULTIPLE_CHOICE":
      return (
        <MultipleChoiceWidget
          question={question.question}
          options={question.options}
          onSubmit={onSubmit}
        />
      );
    default:
      return <div>Unknown question type</div>;
  }
}