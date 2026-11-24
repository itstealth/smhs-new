import { Activity, BookOpen, Brain, Building2, CalendarDays, FlaskConical, Globe, Heart, Lightbulb, Monitor, PartyPopper, ScrollText, ShieldCheck, Sprout, Target, Trophy, UserRoundCheck, Users } from "lucide-react";

/** One line-icon style for CMS-driven and static feature cards. */
export default function FeatureIcon({ name, className = "h-7 w-7" }: { name: string; className?: string }) {
  const key = name.toLowerCase();
  const Icon = /nep|policy|aligned/.test(key) ? ScrollText
    : /facilit|campus|classroom|library/.test(key) ? Building2
    : /lab|stem|science|experiential|hands-on/.test(key) ? FlaskConical
    : /student-cent|personal|individual/.test(key) ? UserRoundCheck
    : /annual|ceremony|event/.test(key) ? CalendarDays
    : /festival|celebrat/.test(key) ? PartyPopper
    : /yoga|fitness|physical/.test(key) ? Activity
    : /well|care|empath|heart|health/.test(key) ? Heart
    : /digital|comput|tech|tool/.test(key) ? Monitor
    : /global|world|international/.test(key) ? Globe
    : /think|critical|research|reflect/.test(key) ? Brain
    : /sport|achiev|excel|award|talent/.test(key) ? Trophy
    : /commun|collab|team|social/.test(key) ? Users
    : /safe|disciplin|responsib/.test(key) ? ShieldCheck
    : /creative|innovat|problem/.test(key) ? Lightbulb
    : /confiden|goal|focus/.test(key) ? Target
    : /grow|holistic|sustain/.test(key) ? Sprout : BookOpen;
  return <Icon className={className} strokeWidth={1.8} aria-hidden="true" />;
}
