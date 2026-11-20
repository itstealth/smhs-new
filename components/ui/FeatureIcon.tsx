import { BookOpen, Brain, Globe, Heart, Lightbulb, Monitor, ShieldCheck, Sprout, Target, Trophy, Users } from "lucide-react";

/** One line-icon style for CMS-driven and static feature cards. */
export default function FeatureIcon({ name, className = "h-7 w-7" }: { name: string; className?: string }) {
  const key = name.toLowerCase();
  const Icon = /well|care|empath|heart|health/.test(key) ? Heart
    : /digital|comput|tech|tool/.test(key) ? Monitor
    : /global|world|international/.test(key) ? Globe
    : /think|critical|research|reflect/.test(key) ? Brain
    : /sport|achiev|excel|award/.test(key) ? Trophy
    : /commun|collab|team|social/.test(key) ? Users
    : /safe|disciplin|responsib/.test(key) ? ShieldCheck
    : /creative|innovat|problem/.test(key) ? Lightbulb
    : /confiden|goal|focus/.test(key) ? Target
    : /grow|holistic|sustain/.test(key) ? Sprout : BookOpen;
  return <Icon className={className} strokeWidth={1.8} aria-hidden="true" />;
}
