import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FileText, Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import './App.css';

function App() {
  const [partyAPreferences, setPartyAPreferences] = useState('');
  const [partyBPreferences, setPartyBPreferences] = useState('');
  const [negotiationStatus, setNegotiationStatus] = useState('idle');
  const [contractTerms, setContractTerms] = useState('');
  const [deploymentStatus, setDeploymentStatus] = useState('');

  const handleInitiateNegotiation = async () => {
    if (!partyAPreferences || !partyBPreferences) {
      alert('Please enter preferences for both parties');
      return;
    }

    setNegotiationStatus('negotiating');
    
    // Simulate negotiation process
    setTimeout(() => {
      const simulatedTerms = `Contract Terms:
- Party A: ${partyAPreferences}
- Party B: ${partyBPreferences}
- Agreement reached on: ${new Date().toLocaleDateString()}
- Duration: 12 months
- Payment terms: Net 30 days`;
      
      setContractTerms(simulatedTerms);
      setNegotiationStatus('completed');
    }, 3000);
  };

  const handleDeployContract = async () => {
    if (!contractTerms) {
      alert('No contract terms available for deployment');
      return;
    }

    setDeploymentStatus('deploying');
    
    // Simulate deployment process
    setTimeout(() => {
      setDeploymentStatus('deployed');
    }, 2000);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'negotiating':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'deploying':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'deployed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      idle: 'secondary',
      negotiating: 'default',
      completed: 'default',
      deploying: 'default',
      deployed: 'default'
    };
    
    return (
      <Badge variant={variants[status]} className="flex items-center gap-1">
        {getStatusIcon(status)}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Contract Negotiation System</h1>
          <p className="text-lg text-gray-600">Multi-Agent LLM-Driven Contract Negotiation and Deployment</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Party Preferences
              </CardTitle>
              <CardDescription>
                Enter the negotiation preferences for both contracting parties
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Party A Preferences</label>
                <Textarea
                  placeholder="Enter Party A's negotiation preferences, terms, and requirements..."
                  value={partyAPreferences}
                  onChange={(e) => setPartyAPreferences(e.target.value)}
                  className="min-h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Party B Preferences</label>
                <Textarea
                  placeholder="Enter Party B's negotiation preferences, terms, and requirements..."
                  value={partyBPreferences}
                  onChange={(e) => setPartyBPreferences(e.target.value)}
                  className="min-h-24"
                />
              </div>
              <Button 
                onClick={handleInitiateNegotiation}
                disabled={negotiationStatus === 'negotiating'}
                className="w-full"
              >
                {negotiationStatus === 'negotiating' ? 'Negotiating...' : 'Initiate Negotiation'}
              </Button>
            </CardContent>
          </Card>

          {/* Status Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Negotiation Status
              </CardTitle>
              <CardDescription>
                Current status of the contract negotiation process
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Negotiation:</span>
                {getStatusBadge(negotiationStatus)}
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Deployment:</span>
                {getStatusBadge(deploymentStatus)}
              </div>
              
              {contractTerms && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">Contract Terms</h4>
                    <div className="bg-gray-50 p-3 rounded-md text-sm whitespace-pre-line">
                      {contractTerms}
                    </div>
                  </div>
                </>
              )}

              {negotiationStatus === 'completed' && (
                <Button 
                  onClick={handleDeployContract}
                  disabled={deploymentStatus === 'deploying' || deploymentStatus === 'deployed'}
                  className="w-full"
                  variant={deploymentStatus === 'deployed' ? 'outline' : 'default'}
                >
                  {deploymentStatus === 'deploying' ? 'Deploying...' : 
                   deploymentStatus === 'deployed' ? 'Contract Deployed' : 'Deploy to Blockchain'}
                </Button>
              )}

              {deploymentStatus === 'deployed' && (
                <div className="bg-green-50 border border-green-200 rounded-md p-3">
                  <div className="flex items-center gap-2 text-green-800">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-medium">Contract Successfully Deployed!</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    Contract ID: contract_{Date.now()}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Agent Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Coordinator Agent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {negotiationStatus === 'negotiating' ? (
                  <>
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Managing negotiation</span>
                  </>
                ) : negotiationStatus === 'completed' ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Negotiation complete</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Waiting for input</span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Negotiating Agents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {negotiationStatus === 'negotiating' ? (
                  <>
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Exchanging proposals</span>
                  </>
                ) : negotiationStatus === 'completed' ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Agreement reached</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Standby</span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Deployment Agent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {deploymentStatus === 'deploying' ? (
                  <>
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Deploying to blockchain</span>
                  </>
                ) : deploymentStatus === 'deployed' ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Successfully deployed</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Awaiting contract</span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
