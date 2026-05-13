import { Icon } from "./Icon";

export default function VerseCard({
  reference,
  text,
}: {
  reference: string;
  text: string;
}) {
  return (
    <section className="bg-surface-container rounded-xl p-md border-l-4 border-primary-container flex flex-col justify-between min-h-[260px] md:col-span-2">
      <div>
        <div className="flex justify-between items-start mb-md">
          <span className="font-label-bold text-label-sm text-primary-container uppercase">
            {reference}
          </span>
          <Icon name="menu_book" className="text-on-surface-variant" />
        </div>
        <p className="font-body-lg text-body-lg text-on-surface italic leading-relaxed">
          “{text}”
        </p>
      </div>
      <div className="mt-md pt-md border-t border-surface-variant flex gap-4">
        <button
          disabled
          className="flex-1 border-2 border-surface-variant py-3 rounded-lg font-label-bold text-label-bold text-on-surface-variant opacity-60 flex items-center justify-center gap-2"
        >
          <Icon name="volume_up" className="text-sm" /> LISTEN
        </button>
        <button
          disabled
          className="flex-1 border-2 border-surface-variant py-3 rounded-lg font-label-bold text-label-bold text-on-surface-variant opacity-60 flex items-center justify-center gap-2"
        >
          <Icon name="share" className="text-sm" /> SHARE
        </button>
      </div>
    </section>
  );
}
