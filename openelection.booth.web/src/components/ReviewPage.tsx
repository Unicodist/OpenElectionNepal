import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { AlertCircle, Edit2, Vote } from "lucide-react";

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

interface ReviewPageProps {
  stages: ElectionStage[];
  selections: Record<string, string>;
  onEdit: (stageIndex: number) => void;
  onSubmit: () => void;
}

export function ReviewPage({ stages, selections, onEdit, onSubmit }: ReviewPageProps) {
  const hasAllSelections = stages.every(stage => selections[stage.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Review Your Ballot</CardTitle>
            <CardDescription>
              Please review your selections carefully before submitting your vote
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Selections List */}
            <div className="space-y-4">
              {stages.map((stage, index) => {
                const selectedCandidate = stage.candidates.find(
                  (c) => c.id === selections[stage.id]
                );

                return (
                  <div
                    key={stage.id}
                    className="border rounded-lg p-4 space-y-3 bg-white"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{stage.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {stage.description}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(index)}
                      >
                        <Edit2 className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>

                    <div className="pt-2 border-t">
                      {selectedCandidate ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {selectedCandidate.image && (
                              <img
                                src={selectedCandidate.image}
                                alt={selectedCandidate.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            )}
                            <div>
                              <p className="font-medium text-gray-900">
                                {selectedCandidate.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {selectedCandidate.party}
                              </p>
                            </div>
                          </div>
                          <Badge variant="secondary">Selected</Badge>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <p className="text-gray-500 italic">No selection made</p>
                          <Badge variant="outline">Skipped</Badge>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Warning if not all selections made */}
            {!hasAllSelections && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-900">
                    Incomplete Ballot
                  </p>
                  <p className="text-sm text-amber-800 mt-1">
                    You have not made selections for all races. You can still submit your ballot, but only the races you voted in will be counted.
                  </p>
                </div>
              </div>
            )}

            {/* Info Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <span className="font-medium">Important:</span> Once you submit your ballot, you will not be able to change your vote. Please ensure all selections are correct.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => onEdit(0)}
                className="flex-1"
              >
                Go Back to Review
              </Button>
              <Button
                onClick={onSubmit}
                className="flex-1"
                size="lg"
              >
                <Vote className="w-4 h-4 mr-2" />
                Submit My Ballot
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}