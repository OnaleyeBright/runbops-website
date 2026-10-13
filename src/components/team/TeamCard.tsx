export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  photo_url: string | null;
  linkedin_url: string | null;
  display_order: number;
};

export default function TeamCard({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  return (
    <article className={`team-card team-${index}`}>
      {member.photo_url ? (
        <img
          src={member.photo_url}
          alt={member.name}
          loading="lazy"
        />
      ) : (
        <div
          className="team-photo-placeholder"
          aria-label={`${member.name} profile photo unavailable`}
        >
          {member.name.charAt(0).toUpperCase()}
        </div>
      )}

      <div>
        <span>
          {String(index + 1).padStart(2, "0")}
        </span>

        <h3>{member.name}</h3>

        <p>{member.role}</p>

        {member.bio && (
          <p className="team-bio">{member.bio}</p>
        )}

        {member.linkedin_url && (
          <a
            href={member.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
          >
            in
          </a>
        )}
      </div>
    </article>
  );
}