import { Icon } from "./Icon";
import type { Upgrade, UserUpgrade } from "@/lib/types";

type Item = UserUpgrade & { upgrade: Upgrade };

const CATEGORY_LABEL: Record<Upgrade["category"], string> = {
  base_avatar: "Base Avatar",
  weapon: "Weapons",
  armor: "Armor",
  companion: "Companions",
  face: "Face",
};

export default function ArmoryGrid({ items }: { items: Item[] }) {
  if (items.length === 0) {
    return (
      <div className="bg-surface-container rounded-xl p-lg text-center border border-surface-variant">
        <Icon name="inventory_2" className="text-primary-container text-4xl" />
        <p className="text-body-md text-on-surface-variant mt-sm">
          No upgrades yet. Complete Day 1 to start your armory.
        </p>
      </div>
    );
  }
  const byCat = new Map<Upgrade["category"], Item[]>();
  for (const it of items) {
    const arr = byCat.get(it.upgrade.category) ?? [];
    arr.push(it);
    byCat.set(it.upgrade.category, arr);
  }
  const order: Upgrade["category"][] = [
    "base_avatar",
    "weapon",
    "armor",
    "face",
    "companion",
  ];

  return (
    <div className="space-y-lg">
      {order
        .filter((c) => byCat.has(c))
        .map((cat) => (
          <section key={cat}>
            <h3 className="font-headline-lg text-title-md mb-md uppercase tracking-tight">
              {CATEGORY_LABEL[cat]}
            </h3>
            <div className="grid grid-cols-2 gap-md">
              {byCat.get(cat)!.map((it) => (
                <div
                  key={it.upgrade.id}
                  className="bg-surface-container-high p-4 rounded-xl flex flex-col items-center gap-3 border border-surface-variant"
                >
                  <div className="w-20 h-20 bg-surface-container-highest rounded-full flex items-center justify-center border border-primary-container/30">
                    <Icon
                      name={it.upgrade.icon}
                      className="text-primary-container text-4xl"
                      fill
                    />
                  </div>
                  <div className="text-center">
                    <p className="font-label-bold text-label-bold">{it.upgrade.name}</p>
                    <p className="font-label-bold text-label-sm text-on-surface-variant uppercase">
                      Day {it.day}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
    </div>
  );
}
