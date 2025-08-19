'use client';

import { SignedIn, SignedOut, RedirectToSignIn, useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import ShowcaseCard from "@/components/dashboard/ShowcaseCard";
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import ApiResponseDisplay from "@/components/dashboard/ApiResponseDisplay";
import { useApiCall } from "@/hooks/useApiCall";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { fetchApi } from "@/common/api";


export default function DashboardPage() {
  const { getToken, isSignedIn } = useAuth();
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  useEffect(() => {
    if (isSignedIn) {
      const fetchToken = async () => {
        const token = await getToken({ template: 'backend' });
        setJwtToken(token);
        console.log("Clerk JWT (backend template):", token);
      };
      fetchToken();
    }
  }, [isSignedIn, getToken]);

  // API call hooks
  const publicApi = useApiCall(() => fetchApi("/public"));
  const privateApi = useApiCall(() => jwtToken ? fetchApi("/private", jwtToken) : Promise.resolve({ error: { message: "JWT Token not available. Please wait or sign in again." }, status: 400 }));
  const greetApi = useApiCall(() => jwtToken ? fetchApi("/greet", jwtToken) : Promise.resolve({ error: { message: "JWT Token not available. Please wait or sign in again." }, status: 400 }));
  const noTokenApi = useApiCall(() => fetchApi("/private"));

  return (
    <>
      <SignedIn>
        <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-col items-center justify-start bg-background p-4 sm:p-8 space-y-10 flex-grow">
          <div className="text-center w-full max-w-6xl">
            {jwtToken ? (
              <>
                <p className="text-md text-muted-foreground mb-2">
                  Your current JWT (Session Token from Clerk):
                </p>
                <p className="font-mono break-all text-xs bg-muted/50 text-foreground p-3 rounded-md shadow-sm border border-border">
                  {jwtToken}
                </p>
              </>
            ) : (
              <p className="text-md text-orange-700 dark:text-orange-300 p-3 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-md">
                Loading JWT token...
              </p>
            )}
          </div>

          {/* Showcase Sections Grid */}
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Showcase 1: Public Endpoint */}
            <ShowcaseCard title="1. Public Endpoint Access">
              <p className="text-sm text-muted-foreground mb-3">
                Calls an endpoint that requires no authentication.
              </p>
              <Button 
                onClick={publicApi.trigger}
                disabled={publicApi.isLoading}
                variant="outline"
                size="default"
              >
                {publicApi.isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Call <code className="text-xs">/public</code></>
                )}
              </Button>
              <ApiResponseDisplay response={publicApi.response} />
            </ShowcaseCard>

            {/* Showcase 2: Private Endpoint (Success) */}
            <ShowcaseCard title="2. Private Endpoint Access (with JWT)">
              <p className="text-sm text-muted-foreground mb-3">
                Calls a protected endpoint, sending the JWT in the Authorization header.
              </p>
              <Button 
                onClick={privateApi.trigger}
                disabled={privateApi.isLoading || !jwtToken}
                variant="outline"
                size="default"
              >
                {privateApi.isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Call <code className="text-xs">/private</code></>
                )}
              </Button>
              <ApiResponseDisplay response={privateApi.response} />
            </ShowcaseCard>

            {/* Showcase 3: Personalized Content */}
            <ShowcaseCard title="3. Personalized Content (using JWT)">
              <p className="text-sm text-muted-foreground mb-3">
                Backend uses JWT claims to return personalized data.
              </p>
              <Button 
                onClick={greetApi.trigger}
                disabled={greetApi.isLoading || !jwtToken}
                variant="outline"
                size="default"
              >
                {greetApi.isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Call <code className="text-xs">/greet</code></>
                )}
              </Button>
              <ApiResponseDisplay response={greetApi.response} />
            </ShowcaseCard>

            {/* Showcase 4: Private Access Without JWT */}
            <ShowcaseCard title="4. Private Access Attempt (NO JWT)">
              <p className="text-sm text-muted-foreground mb-3">
                Attempts to call a protected endpoint without sending the JWT. Expect an error.
              </p>
              <Button
                onClick={noTokenApi.trigger}
                disabled={noTokenApi.isLoading}
                variant="outline"
                size="default"
              >
                {noTokenApi.isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Call <code className="text-xs">/private</code> (No Token)</>
                )}
              </Button>
              <ApiResponseDisplay response={noTokenApi.response} defaultToError={true} />
            </ShowcaseCard>
          </div>
        </div>
        <Footer />
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn redirectUrl="/signin" />
      </SignedOut>
    </>
  );
}