import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle2, ChevronLeft, ChevronRight, SkipForward } from "lucide-react";
import { ReviewPage } from "./ReviewPage";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

interface Candidate {
  id: string;
  name: string;
  party: string;
  image?: string;
}

interface ElectionStage {
  id: string;
  title: string;
  description: string;
  candidates: Candidate[];
}

// Mock election data
const electionStages: ElectionStage[] = [
  {
    id: "president",
    title: "Presidential Election",
    description: "Select your preferred candidate for President",
    candidates: [
      { 
        id: "p1", 
        name: "Sarah Johnson", 
        party: "Democratic Party",
        image: "https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2OTI3MTc0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      { 
        id: "p2", 
        name: "Michael Chen", 
        party: "Republican Party",
        image: "https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBzdWl0fGVufDF8fHx8MTc2OTIzNjAyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      { 
        id: "p3", 
        name: "Elena Rodriguez", 
        party: "Independent",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY5MjI5NTg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      { 
        id: "p4", 
        name: "James Williams", 
        party: "Green Party",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzc21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2OTI2NzE1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
    ],
  },
  {
    id: "governor",
    title: "Governor Election",
    description: "Select your preferred candidate for Governor",
    candidates: [
      { 
        id: "g1", 
        name: "Robert Anderson", 
        party: "Democratic Party",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGV4ZWN1dGl2ZXxlbnwxfHx8fDE3NjkxOTgxNjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      { 
        id: "g2", 
        name: "Patricia Davis", 
        party: "Republican Party",
        image: "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjkyMDY5NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      { 
        id: "g3", 
        name: "David Martinez", 
        party: "Independent",
        image: "https://images.unsplash.com/photo-1601489865452-407a1b801dde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc21hbnxlbnwxfHx8fDE3NjkyNDMwNTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
    ],
  },
  {
    id: "senator",
    title: "Senate Election",
    description: "Select your preferred candidate for Senator",
    candidates: [
      { 
        id: "s1", 
        name: "Jennifer Brown", 
        party: "Democratic Party",
        image: "https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2OTI3MTc0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      { 
        id: "s2", 
        name: "Thomas Wilson", 
        party: "Republican Party",
        image: "https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBzdWl0fGVufDF8fHx8MTc2OTIzNjAyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      { 
        id: "s3", 
        name: "Maria Garcia", 
        party: "Libertarian Party",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY5MjI5NTg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      { 
        id: "s4", 
        name: "Christopher Lee", 
        party: "Independent",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzc21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2OTI2NzE1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
    ],
  },
];

export function VotingPage() {
  const [currentStage, setCurrentStage] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [showReview, setShowReview] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const stage = electionStages[currentStage];
  const progress = ((currentStage + 1) / electionStages.length) * 100;
  const isLastStage = currentStage === electionStages.length - 1;

  const handleNext = () => {
    if (isLastStage) {
      setShowReview(true);
    } else {
      setCurrentStage((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    // Remove selection if exists and move to next
    const newSelections = { ...selections };
    delete newSelections[stage.id];
    setSelections(newSelections);
    
    if (isLastStage) {
      setShowReview(true);
    } else {
      setCurrentStage((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStage((prev) => Math.max(0, prev - 1));
  };

  const handleSelection = (candidateId: string) => {
    setSelections((prev) => ({
      ...prev,
      [stage.id]: candidateId,
    }));
  };

  const handleEditFromReview = (stageIndex: number) => {
    setShowReview(false);
    setCurrentStage(stageIndex);
  };

  const handleFinalSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Vote Submitted Successfully</CardTitle>
            <CardDescription>
              Thank you for participating in the election. Your vote has been recorded.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm font-medium text-green-900 mb-2">Your selections:</p>
              <div className="space-y-2">
                {electionStages.map((stage) => {
                  const selectedCandidate = stage.candidates.find(
                    (c) => c.id === selections[stage.id]
                  );
                  return (
                    <div key={stage.id} className="text-sm text-green-800">
                      <span className="font-medium">{stage.title}:</span>{" "}
                      {selectedCandidate ? selectedCandidate.name : "No selection"}
                    </div>
                  );
                })}
              </div>
            </div>
            <p className="text-sm text-gray-600 text-center">
              You will receive a confirmation email shortly.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showReview) {
    return (
      <ReviewPage
        stages={electionStages}
        selections={selections}
        onEdit={handleEditFromReview}
        onSubmit={handleFinalSubmit}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Progress Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700">
              Stage {currentStage + 1} of {electionStages.length}
            </span>
            <span className="text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Stage Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {electionStages.map((stg, index) => (
            <Badge
              key={stg.id}
              variant={index === currentStage ? "default" : selections[stg.id] ? "secondary" : "outline"}
              className="whitespace-nowrap"
            >
              {selections[stg.id] && <CheckCircle2 className="w-3 h-3 mr-1" />}
              {stg.title}
            </Badge>
          ))}
        </div>

        {/* Main Voting Card */}
        <Card>
          <CardHeader>
            <CardTitle>{stage.title}</CardTitle>
            <CardDescription>{stage.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup
              value={selections[stage.id] || ""}
              onValueChange={handleSelection}
            >
              <div className="space-y-3">
                {stage.candidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className={`relative flex items-start space-x-3 rounded-lg border p-4 cursor-pointer transition-all hover:bg-gray-50 ${
                      selections[stage.id] === candidate.id
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-200"
                    }`}
                  >
                    <RadioGroupItem
                      value={candidate.id}
                      id={candidate.id}
                      className="mt-1"
                    />
                    {candidate.image && (
                      <img
                        src={candidate.image}
                        alt={candidate.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <Label
                      htmlFor={candidate.id}
                      className="flex-1 cursor-pointer"
                    >
                      <div className="space-y-1">
                        <p className="font-medium text-gray-900">{candidate.name}</p>
                        <p className="text-sm text-gray-500">{candidate.party}</p>
                      </div>
                    </Label>
                    {selections[stage.id] === candidate.id && (
                      <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                    )}
                  </div>
                ))}
              </div>
            </RadioGroup>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4 gap-3">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStage === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleSkip}
                >
                  <SkipForward className="w-4 h-4 mr-1" />
                  Skip
                </Button>
                
                <Button
                  onClick={handleNext}
                  disabled={!selections[stage.id]}
                >
                  {isLastStage ? (
                    <>
                      Review Ballot
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <span className="font-medium">Note:</span> You can skip any race if you choose not to vote in it. You can also navigate back to review and change your selections at any time before final submission.
          </p>
        </div>
      </div>
    </div>
  );
}