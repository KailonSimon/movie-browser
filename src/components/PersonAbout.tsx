import PersonSocials from "./PersonSocials";
import dayjs from "dayjs";

function PersonAbout({ person }: any) {
  return (
    <section className="mt-8 w-full">
      <h3 className="text-3xl md:text-xl text-neutral-content font-semibold mb-2">
        Personal Info
      </h3>
      <p className="mb-[20px]">
        <bdi className="font-semibold block">Known for</bdi>
        {person.known_for_department || "-"}
      </p>
      <p className="mb-[20px]">
        <bdi className="font-semibold block">Gender</bdi>
        {person.gender === 1 ? "Female" : person.gender === 2 ? "Male" : "-"}
      </p>
      <p className="mb-[20px]">
        <bdi className="font-semibold block">Birthday</bdi>
        {dayjs(person.birthday).format("MMMM D, YYYY") || "-"}
      </p>
      <p className="mb-[20px]">
        <bdi className="font-semibold block">Place of Birth</bdi>
        {person.place_of_birth || "-"}
      </p>
      {person.also_known_as.length > 0 && (
        <>
          <bdi className="font-semibold block">Also Known As</bdi>
          <ul>
            {person.also_known_as.map((alias: string) => (
              <li key={alias}>{alias}</li>
            ))}
          </ul>
        </>
      )}
      <PersonSocials externalIds={person.external_ids} />
    </section>
  );
}

export default PersonAbout;
