package com.dharni.weddingplanner.domain;

import com.dharni.weddingplanner.domain.enumeration.Plan;
import java.time.Instant;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Booking.class)
public abstract class Booking_ {

	public static volatile SingularAttribute<Booking, String> venue;
	public static volatile SingularAttribute<Booking, Instant> createdDate;
	public static volatile SingularAttribute<Booking, String> contactNumber;
	public static volatile SingularAttribute<Booking, String> emailId;
	public static volatile SingularAttribute<Booking, Long> id;
	public static volatile SingularAttribute<Booking, String> userName;
	public static volatile SingularAttribute<Booking, Plan> plan;
	public static volatile SingularAttribute<Booking, String> userId;
	public static volatile SingularAttribute<Booking, Instant> eventDate;

	public static final String VENUE = "venue";
	public static final String CREATED_DATE = "createdDate";
	public static final String CONTACT_NUMBER = "contactNumber";
	public static final String EMAIL_ID = "emailId";
	public static final String ID = "id";
	public static final String USER_NAME = "userName";
	public static final String PLAN = "plan";
	public static final String USER_ID = "userId";
	public static final String EVENT_DATE = "eventDate";

}

